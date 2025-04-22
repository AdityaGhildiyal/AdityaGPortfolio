"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import * as THREE from "three"

export default function ThreeDModel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !isInView) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(300, 300)
    renderer.setClearColor(0x000000, 0)

    // Clear any existing canvas
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }

    containerRef.current.appendChild(renderer.domElement)

    // Create a geometric shape - code cube
    const geometry = new THREE.BoxGeometry(3, 3, 3)

    // Create materials for each face with code-like patterns
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true }),
    ]

    const cube = new THREE.Mesh(geometry, materials)
    scene.add(cube)

    // Add particles around the cube
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500

    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x10b981,
      transparent: true,
      opacity: 0.8,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      cube.rotation.x += 0.005
      cube.rotation.y += 0.005

      particlesMesh.rotation.x += 0.001
      particlesMesh.rotation.y += 0.001

      renderer.render(scene, camera)
    }

    animate()
    setIsLoaded(true)

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(300, 300)
      camera.updateProjectionMatrix()
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [isInView])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="w-[300px] h-[300px] mx-auto"
    />
  )
}
