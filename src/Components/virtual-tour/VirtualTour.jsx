import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { ChevronLeft, ChevronRight, X, Maximize2, Navigation, Info, Heart, ArrowLeft, Camera, Package } from 'lucide-react';
import { base44 } from '../../api/base44Client';
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import FurnitureDetailModal from './FurnitureDetailModal';

const tourSpaces = [
    {
        id: 'lobby',
        name: 'Grand Lobby',
        description: 'Welcome to elegance and sophistication',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=2000&q=90',
        hotspots: [
            { id: 'spa', position: { x: -0.5, y: 0, z: -0.5 }, targetSpace: 'spa', label: 'To Spa' },
            { id: 'pool', position: { x: 0.5, y: 0, z: -0.5 }, targetSpace: 'pool', label: 'To Pool' },
            { id: 'info1', position: { x: 0, y: 0.3, z: -0.6 }, type: 'info', label: 'Marble Flooring', details: 'Imported Italian marble from Carrara, hand-selected for its unique veining patterns', favoritable: true },
            { id: 'info2', position: { x: -0.3, y: 0.2, z: 0.5 }, type: 'info', label: 'Crystal Chandelier', details: 'Custom 18th-century inspired chandelier with 2,500 hand-cut crystals', favoritable: true },
            { id: 'furniture1', position: { x: 0.4, y: -0.2, z: 0.3 }, type: 'furniture', label: 'Luxury Sofa', details: { name: 'Luxury Velvet Sofa', type: 'furniture', description: 'Hand-crafted Italian velvet sofa with solid oak frame', price: 4500, features: ['Premium velvet upholstery', 'Solid oak frame', 'Made in Italy', 'Custom color options'], highValue: true } }
        ]
    },
    {
        id: 'deluxe',
        name: 'Deluxe Suite',
        description: 'Spacious luxury with panoramic views',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=2000&q=90',
        hotspots: [
            { id: 'lobby', position: { x: 0, y: 0, z: 0.5 }, targetSpace: 'lobby', label: 'To Lobby' },
            { id: 'presidential', position: { x: 0.7, y: 0, z: 0 }, targetSpace: 'presidential', label: 'Presidential Suite' },
            { id: 'info3', position: { x: -0.4, y: -0.2, z: -0.5 }, type: 'info', label: 'Smart Controls', details: 'iPad-controlled lighting, temperature, and entertainment system', favoritable: true },
            { id: 'info4', position: { x: 0.3, y: 0, z: -0.6 }, type: 'info', label: 'Premium Bedding', details: '1000-thread count Egyptian cotton sheets and hypoallergenic pillows', favoritable: true },
            { id: 'furniture2', position: { x: 0.5, y: 0.1, z: -0.4 }, type: 'furniture', label: 'Designer Lamp', details: { name: 'Murano Glass Table Lamp', type: 'lighting', description: 'Authentic Murano glass with brass accents', price: 1200, originalPrice: 1500, features: ['Hand-blown Murano glass', 'Brass base', 'LED compatible', 'Limited edition'], purchaseLink: '#', financing: true } }
        ]
    },
    {
        id: 'presidential',
        name: 'Presidential Suite',
        description: 'The pinnacle of luxury accommodation',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=2000&q=90',
        hotspots: [
            { id: 'deluxe', position: { x: -0.7, y: 0, z: 0 }, targetSpace: 'deluxe', label: 'Deluxe Suite' },
            { id: 'lobby', position: { x: 0, y: 0, z: 0.5 }, targetSpace: 'lobby', label: 'To Lobby' }
        ]
    },
    {
        id: 'spa',
        name: 'Luxury Spa',
        description: 'Tranquil sanctuary for rejuvenation',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=2000&q=90',
        hotspots: [
            { id: 'lobby', position: { x: 0, y: 0, z: 0.5 }, targetSpace: 'lobby', label: 'To Lobby' },
            { id: 'pool', position: { x: 0.6, y: 0, z: -0.3 }, targetSpace: 'pool', label: 'To Pool' }
        ]
    },
    {
        id: 'pool',
        name: 'Infinity Pool',
        description: 'Rooftop paradise with stunning skyline views',
        image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=2000&q=90',
        hotspots: [
            { id: 'lobby', position: { x: 0, y: 0, z: 0.5 }, targetSpace: 'lobby', label: 'To Lobby' },
            { id: 'spa', position: { x: -0.6, y: 0, z: -0.3 }, targetSpace: 'spa', label: 'To Spa' }
        ]
    }
];

export default function VirtualTour({ initialSpace = 'lobby', onClose }) {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const hotspotGroupRef = useRef(null);
    const animateRef = useRef(null);
    const [currentSpace, setCurrentSpace] = useState(initialSpace);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [hoveredHotspot, setHoveredHotspot] = useState(null);
    const [showControls, setShowControls] = useState(true);
    const [showInfoPanel, setShowInfoPanel] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);
    const [showFurnitureModal, setShowFurnitureModal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedHotspotIndex, setSelectedHotspotIndex] = useState(-1);

    // Scene setup useEffect
    useEffect(() => {
        if (!containerRef.current || sceneRef.current) return;
        sceneRef.current = true;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(0, 0, 0.1);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create sphere for 360 panorama
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1); // Invert to see inside

        const material = new THREE.MeshBasicMaterial();
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Hotspot markers
        const hotspotGroup = new THREE.Group();
        scene.add(hotspotGroup);
        hotspotGroupRef.current = hotspotGroup;

        // Mouse/touch interaction
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let lon = 0, lat = 0;
        let phi = 0, theta = 0;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseDown = (event) => {
            isDragging = true;
            previousMousePosition = {
                x: event.clientX || event.touches[0].clientX,
                y: event.clientY || event.touches[0].clientY
            };
        };

        const onMouseMove = (event) => {
            const clientX = event.clientX || (event.touches && event.touches[0].clientX);
            const clientY = event.clientY || (event.touches && event.touches[0].clientY);

            if (isDragging) {
                const deltaX = clientX - previousMousePosition.x;
                const deltaY = clientY - previousMousePosition.y;

                lon -= deltaX * 0.1;
                lat += deltaY * 0.1;
                lat = Math.max(-85, Math.min(85, lat));

                previousMousePosition = { x: clientX, y: clientY };
            }

            // Check for hotspot hover
            const rect = container.getBoundingClientRect();
            mouse.x = ((clientX - rect.left) / width) * 2 - 1;
            mouse.y = -((clientY - rect.top) / height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(hotspotGroup.children);

            if (intersects.length > 0) {
                const hotspot = intersects[0].object.userData;
                setHoveredHotspot(hotspot);
                document.body.style.cursor = 'pointer';
            } else {
                setHoveredHotspot(null);
                document.body.style.cursor = isDragging ? 'grabbing' : 'grab';
            }
        };

        const onMouseUp = () => {
            isDragging = false;
        };

        const onClick = (event) => {
            if (isDragging) return;

            const rect = container.getBoundingClientRect();
            const clientX = event.clientX || (event.changedTouches && event.changedTouches[0].clientX);
            const clientY = event.clientY || (event.changedTouches && event.changedTouches[0].clientY);

            mouse.x = ((clientX - rect.left) / width) * 2 - 1;
            mouse.y = -((clientY - rect.top) / height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(hotspotGroup.children);

            if (intersects.length > 0) {
                const userData = intersects[0].object.userData;
                if (userData.type === 'info') {
                    setShowInfoPanel(userData);
                } else if (userData.type === 'furniture') {
                    setShowFurnitureModal(userData.details);
                } else if (userData.targetSpace) {
                    setIsTransitioning(true);
                    setTimeout(() => {
                        setCurrentSpace(userData.targetSpace);
                        setIsTransitioning(false);
                    }, 300);
                }
            }
        };

        container.addEventListener('mousedown', onMouseDown);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseup', onMouseUp);
        container.addEventListener('touchstart', onMouseDown);
        container.addEventListener('touchmove', onMouseMove);
        container.addEventListener('touchend', onMouseUp);
        container.addEventListener('click', onClick);

        // Animation loop
        const animate = () => {
            animateRef.current = requestAnimationFrame(animate);

            phi = THREE.MathUtils.degToRad(90 - lat);
            theta = THREE.MathUtils.degToRad(lon);

            camera.position.x = 0.1 * Math.sin(phi) * Math.cos(theta);
            camera.position.y = 0.1 * Math.cos(phi);
            camera.position.z = 0.1 * Math.sin(phi) * Math.sin(theta);

            camera.lookAt(scene.position);

            // Animate hotspot markers
            hotspotGroup.children.forEach((child, index) => {
                if (!child.userData.isRing) {
                    child.rotation.y += 0.01;
                    child.scale.setScalar(1 + Math.sin(Date.now() * 0.002 + index) * 0.1);
                } else {
                    child.rotation.z += 0.02;
                }
            });

            renderer.render(scene, camera);
        };
        animate();

        // Resize handler
        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            container.removeEventListener('mousedown', onMouseDown);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseup', onMouseUp);
            container.removeEventListener('touchstart', onMouseDown);
            container.removeEventListener('touchmove', onMouseMove);
            container.removeEventListener('touchend', onMouseUp);
            container.removeEventListener('click', onClick);
            window.removeEventListener('resize', handleResize);
            document.body.style.cursor = 'default';
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            sceneRef.current = null;
            cameraRef.current = null;
            rendererRef.current = null;
            hotspotGroupRef.current = null;
            if (animateRef.current) {
                cancelAnimationFrame(animateRef.current);
            }
        };
    }, []);

    // Texture and hotspots loading useEffect
    useEffect(() => {
        if (!sceneRef.current || !hotspotGroupRef.current) return;

        const scene = sceneRef.current;
        const hotspotGroup = hotspotGroupRef.current;
        const material = scene.children[0].material; // sphere material

        let currentTexture = null;

        const loadSpaceTexture = (spaceId) => {
            const space = tourSpaces.find(s => s.id === spaceId);
            if (!space) return;

            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(space.image, (texture) => {
                if (currentTexture) currentTexture.dispose();
                currentTexture = texture;
                material.map = texture;
                material.needsUpdate = true;
                setIsLoading(false); // Set loading to false when texture is loaded
            });

            // Clear and create hotspots
            while (hotspotGroup.children.length > 0) {
                hotspotGroup.remove(hotspotGroup.children[0]);
            }

            space.hotspots.forEach(hotspot => {
                // Create hotspot marker with different colors for different types
                const markerGeometry = new THREE.SphereGeometry(5, 16, 16);
                const getColor = () => {
                    if (hotspot.type === 'info') return 0x4a90e2;
                    if (hotspot.type === 'furniture') return 0x9b59b6;
                    return 0xc9a55c;
                };
                const markerMaterial = new THREE.MeshBasicMaterial({
                    color: getColor(),
                    transparent: true,
                    opacity: 0.8
                });
                const marker = new THREE.Mesh(markerGeometry, markerMaterial);

                // Position in 3D space
                const radius = 450;
                marker.position.set(
                    hotspot.position.x * radius,
                    hotspot.position.y * radius,
                    hotspot.position.z * radius
                );

                marker.userData = {
                    hotspotId: hotspot.id,
                    targetSpace: hotspot.targetSpace,
                    label: hotspot.label,
                    type: hotspot.type,
                    details: hotspot.details,
                    favoritable: hotspot.favoritable
                };

                hotspotGroup.add(marker);

                // Add ring around marker
                const ringGeometry = new THREE.RingGeometry(6, 8, 32);
                const ringMaterial = new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.6,
                    side: THREE.DoubleSide
                });
                const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                ring.position.copy(marker.position);
                ring.lookAt(0, 0, 0);
                ring.userData = {
                    hotspotId: hotspot.id,
                    targetSpace: hotspot.targetSpace,
                    label: hotspot.label,
                    type: hotspot.type,
                    details: hotspot.details,
                    favoritable: hotspot.favoritable,
                    isRing: true
                };
                hotspotGroup.add(ring);
            });
        };

        loadSpaceTexture(currentSpace);

        return () => {
            if (currentTexture) currentTexture.dispose();
        };
    }, [currentSpace]);

    // Reset selected hotspot index when space changes
    useEffect(() => {
        setSelectedHotspotIndex(-1);
    }, [currentSpace]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            const currentSpaceData = tourSpaces.find(s => s.id === currentSpace);
            if (!currentSpaceData) return;

            switch (event.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    event.preventDefault();
                    setSelectedHotspotIndex((prev) => {
                        const next = (prev + 1) % currentSpaceData.hotspots.length;
                        return next;
                    });
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    event.preventDefault();
                    setSelectedHotspotIndex((prev) => {
                        const prevIndex = prev - 1;
                        return prevIndex < 0 ? currentSpaceData.hotspots.length - 1 : prevIndex;
                    });
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    if (selectedHotspotIndex >= 0 && selectedHotspotIndex < currentSpaceData.hotspots.length) {
                        const hotspot = currentSpaceData.hotspots[selectedHotspotIndex];
                        if (hotspot.type === 'info') {
                            setShowInfoPanel(hotspot);
                        } else if (hotspot.type === 'furniture') {
                            setShowFurnitureModal(hotspot.details);
                        } else if (hotspot.targetSpace) {
                            setIsTransitioning(true);
                            setTimeout(() => {
                                setCurrentSpace(hotspot.targetSpace);
                                setIsTransitioning(false);
                            }, 300);
                        }
                    }
                    break;
                case 'Escape':
                    event.preventDefault();
                    setSelectedHotspotIndex(-1);
                    setShowInfoPanel(null);
                    setShowFurnitureModal(null);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSpace, selectedHotspotIndex]);

    const currentSpaceData = tourSpaces.find(s => s.id === currentSpace);
    const currentIndex = tourSpaces.findIndex(s => s.id === currentSpace);

    const handleFavorite = async () => {
        try {
            const user = await base44.auth.me();
            if (isFavorited) {
                toast.success('Removed from favorites');
                setIsFavorited(false);
            } else {
                await base44.entities.FavoritePlace.create({
                    user_email: user.email,
                    place_id: currentSpace,
                    place_name: currentSpaceData.name,
                    place_type: 'general'
                });
                toast.success('Added to favorites!');
                setIsFavorited(true);
            }
        } catch (error) {
            toast.error('Please log in to save favorites');
        }
    };

    const captureSnapshot = async () => {
        try {
            const user = await base44.auth.me();
            await base44.entities.Snapshot.create({
                user_email: user.email,
                space_name: currentSpaceData.name,
                image_url: currentSpaceData.image,
                tags: ['virtual-tour']
            });
            toast.success('Snapshot saved to your mood board!');
        } catch (error) {
            toast.error('Please log in to save snapshots');
        }
    };

    const goToNext = () => {
        const nextIndex = (currentIndex + 1) % tourSpaces.length;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSpace(tourSpaces[nextIndex].id);
            setIsTransitioning(false);
        }, 300);
    };

    const goToPrevious = () => {
        const prevIndex = (currentIndex - 1 + tourSpaces.length) % tourSpaces.length;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSpace(tourSpaces[prevIndex].id);
            setIsTransitioning(false);
        }, 300);
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
                    <div className="text-center">
                        <div className="animate-spin w-12 h-12 border-4 border-[#c9a55c] border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-[#c9a55c] font-['Cinzel'] text-lg">Loading Virtual Tour...</p>
                    </div>
                </div>
            )}

            {/* 3D Canvas */}
            <div
                ref={containerRef}
                className={`w-full h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Top Info Bar */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -100 }}
                        className="absolute top-0 left-0 right-0 bg-linear-to-b from-black/80 to-transparent p-3 md:p-6 z-10"
                    >
                        <div className="max-w-7xl mx-auto flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <h2 className="text-white text-lg md:text-2xl font-light mb-1 truncate">
                                    {currentSpaceData?.name}
                                </h2>
                                <p className="text-white/60 text-xs md:text-sm hidden sm:block">
                                    {currentSpaceData?.description}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 md:gap-3 ml-2">
                                <Link to={createPageUrl('Home')}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-white hover:bg-white/10 border border-white/20 text-xs md:text-sm px-2 md:px-4"
                                    >
                                        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                                        <span className="hidden sm:inline">Back to Home</span>
                                        <span className="sm:hidden">Home</span>
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={captureSnapshot}
                                    className="text-white hover:bg-white/10 w-8 h-8 md:w-10 md:h-10"
                                    title="Take Snapshot"
                                >
                                    <Camera className="w-4 h-4 md:w-5 md:h-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleFavorite}
                                    className={`text-white hover:bg-white/10 w-8 h-8 md:w-10 md:h-10 ${isFavorited ? 'text-red-500' : ''}`}
                                    title="Favorite Space"
                                >
                                    <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isFavorited ? 'fill-current' : ''}`} />
                                </Button>
                                {onClose && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={onClose}
                                        className="text-white hover:bg-white/10 w-8 h-8 md:w-10 md:h-10"
                                    >
                                        <X className="w-4 h-4 md:w-6 md:h-6" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Furniture Detail Modal */}
            {showFurnitureModal && (
                <FurnitureDetailModal
                    item={showFurnitureModal}
                    onClose={() => setShowFurnitureModal(null)}
                />
            )}

            {/* Navigation Controls */}
            <AnimatePresence>
                {showControls && (
                    <>
                        <motion.button
                            initial={{ x: -100 }}
                            animate={{ x: 0 }}
                            exit={{ x: -100 }}
                            onClick={goToPrevious}
                            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 md:p-4 rounded-full transition-all z-10"
                        >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </motion.button>

                        <motion.button
                            initial={{ x: 100 }}
                            animate={{ x: 0 }}
                            exit={{ x: 100 }}
                            onClick={goToNext}
                            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 md:p-4 rounded-full transition-all z-10"
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                        </motion.button>
                    </>
                )}
            </AnimatePresence>

            {/* Hotspot Label */}
            <AnimatePresence>
                {hoveredHotspot && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 md:px-4 py-2 rounded-lg pointer-events-none z-20 ${
                            hoveredHotspot.type === 'info' ? 'bg-blue-500' :
                            hoveredHotspot.type === 'furniture' ? 'bg-purple-500' :
                            'bg-[#c9a55c]'
                        } text-white`}
                    >
                        <div className="flex items-center gap-2">
                            {hoveredHotspot.type === 'info' ? <Info className="w-3 h-3 md:w-4 md:h-4" /> :
                             hoveredHotspot.type === 'furniture' ? <Package className="w-3 h-3 md:w-4 md:h-4" /> :
                             <Navigation className="w-3 h-3 md:w-4 md:h-4" />}
                            <span className="font-medium text-sm md:text-base">{hoveredHotspot.label}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Info Panel */}
            <AnimatePresence>
                {showInfoPanel && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-4 md:p-6 max-w-sm md:max-w-md shadow-2xl z-20"
                    >
                        <button
                            onClick={() => setShowInfoPanel(null)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                                <Info className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">{showInfoPanel.label}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">{showInfoPanel.details}</p>
                                {showInfoPanel.favoritable && (
                                    <Button
                                        onClick={async () => {
                                            try {
                                                const user = await base44.auth.me();
                                                await base44.entities.FavoritePlace.create({
                                                    user_email: user.email,
                                                    place_id: showInfoPanel.hotspotId,
                                                    place_name: showInfoPanel.label,
                                                    place_type: 'amenity',
                                                    notes: showInfoPanel.details
                                                });
                                                toast.success('Added to favorites!');
                                                setShowInfoPanel(null);
                                            } catch (error) {
                                                toast.error('Please log in to save favorites');
                                            }
                                        }}
                                        className="w-full bg-linear-to-r from-[#c9a55c] to-[#d4af6a] hover:from-[#b8944b] hover:to-[#c9a55c] text-white rounded-xl"
                                    >
                                        <Heart className="w-4 h-4 mr-2" />
                                        Add to Favorites
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Control Bar */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-3 md:p-6 z-10"
                    >
                        <div className="max-w-7xl mx-auto">
                            {/* Space thumbnails */}
                            <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4 overflow-x-auto">
                                {tourSpaces.map((space) => (
                                    <button
                                        key={space.id}
                                        onClick={() => {
                                            setIsTransitioning(true);
                                            setTimeout(() => {
                                                setCurrentSpace(space.id);
                                                setIsTransitioning(false);
                                            }, 300);
                                        }}
                                        className={`group relative overflow-hidden rounded-lg transition-all shrink-0 ${
                                            currentSpace === space.id
                                                ? 'ring-2 ring-[#c9a55c] scale-110'
                                                : 'opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <img
                                            src={space.image}
                                            alt={space.name}
                                            className="w-16 h-12 md:w-20 md:h-14 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                {space.name.split(' ')[0]}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Instructions */}
                            <p className="text-center text-white/60 text-xs md:text-sm px-2 md:px-4">
                                <span className="hidden md:inline">Drag to look around • Click hotspots to navigate • </span>
                                <span className="md:hidden">Touch to look around • Tap hotspots to navigate • </span>
                                {currentIndex + 1} / {tourSpaces.length}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle controls button */}
            <button
                onClick={() => setShowControls(!showControls)}
                className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 md:p-3 rounded-full transition-all z-30"
            >
                <Maximize2 className="w-6 h-6 md:w-5 md:h-5" />
            </button>
        </div>
    );
}
