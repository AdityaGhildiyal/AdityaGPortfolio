"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import * as THREE from "three"

export default function ThreeDElements() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !isInView) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 15

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    // Clear any existing canvas
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }

    containerRef.current.appendChild(renderer.domElement)

    // Create multiple 3D objects
    const objects: THREE.Mesh[] = []

    // 1. Dodecahedron (left side)
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(1.5, 0)
    const dodecahedronMaterial = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true })
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial)
    dodecahedron.position.set(-window.innerWidth / 4, window.innerHeight / 4, -5)
    scene.add(dodecahedron)
    objects.push(dodecahedron)

    // 2. Torus (right side)
    const torusGeometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100)
    const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true })
    const torus = new THREE.Mesh(torusGeometry, torusMaterial)
    torus.position.set(window.innerWidth / 4, -window.innerHeight / 4, -3)
    scene.add(torus)
    objects.push(torus)

    // 3. Octahedron (top right)
    const octahedronGeometry = new THREE.OctahedronGeometry(1.2, 0)
    const octahedronMaterial = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true })
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial)
    octahedron.position.set(window.innerWidth / 3, window.innerHeight / 3, -10)
    scene.add(octahedron)
    objects.push(octahedron)

    // 4. Tetrahedron (bottom left)
    const tetrahedronGeometry = new THREE.TetrahedronGeometry(1.5, 0)
    const tetrahedronMaterial = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true })
    const tetrahedron = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial)
    tetrahedron.position.set(-window.innerWidth / 3, -window.innerHeight / 3, -8)
    scene.add(tetrahedron)
    objects.push(tetrahedron)

    // Add particles around all objects
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500

    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30
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

      // Rotate all objects at different speeds and axes
      dodecahedron.rotation.x += 0.007
      dodecahedron.rotation.z += 0.003

      torus.rotation.x += 0.003
      torus.rotation.y += 0.008

      octahedron.rotation.y += 0.006
      octahedron.rotation.z += 0.004

      tetrahedron.rotation.x += 0.004
      tetrahedron.rotation.y += 0.007

      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005

      // Slowly move objects in a slight floating motion
      const time = Date.now() * 0.001

      dodecahedron.position.y = window.innerHeight / 4 + Math.sin(time * 0.5) * 0.5
      torus.position.x = window.innerWidth / 4 + Math.cos(time * 0.3) * 0.3
      octahedron.position.y = window.innerHeight / 3 + Math.sin(time * 0.4) * 0.4
      tetrahedron.position.x = -window.innerWidth / 3 + Math.cos(time * 0.2) * 0.2

      renderer.render(scene, camera)
    }

    animate()
    setIsLoaded(true)

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)

      // Update object positions on resize
      dodecahedron.position.set(-window.innerWidth / 4, window.innerHeight / 4, -5)
      torus.position.set(window.innerWidth / 4, -window.innerHeight / 4, -3)
      octahedron.position.set(window.innerWidth / 3, window.innerHeight / 3, -10)
      tetrahedron.position.set(-window.innerWidth / 3, -window.innerHeight / 3, -8)
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  )
}
