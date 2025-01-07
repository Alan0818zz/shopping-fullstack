"use client";
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Image from "next/image";

const CarouselContainer = styled.div`
    position: relative;
    width: 100vw;
    height: 800px;
    overflow: hidden;
    margin-left: calc(-50vw + 50%);
`;

const CarouselTrack = styled.div`
    display: flex;
    transition: transform 0.75s ease-in-out;
    transform: translateX(-${props => props.$currentIndex * 100}%);
    width: 100%;
    height: 100%;
`;

const ImageWrapper = styled.div`
    flex: 0 0 100%;
    position: relative;
    width: 100%;
    height: 100%;
`;

const CarouselImage = styled(Image)`
    object-fit: cover;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.5);
  color: black;
  border: none;
  padding: 15px;
  cursor: pointer;
  z-index: 10;
  font-size: 24px;
  border-radius: 50%;
  &:first-child {
    left: 20px;
  }
  &:last-of-type {
    right: 20px;
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const Dot = styled.span`
    height: 12px;
    width: 12px;
    background-color: ${props => props.$active ? '#333333' : 'rgba(128,128,128,0.5)'};
    border-radius: 50%;
    display: inline-block;
    margin: 0 8px;
    cursor: pointer;
`;

const images = [
  '/avatars/Logo4.png',
  '/avatars/Logo1.png',
  '/avatars/Logo2.png',
  '/avatars/Logo3.png',
];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000); // 10秒切换一次

        return () => clearInterval(timer); // 清理定时器
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <CarouselContainer>
            <CarouselButton onClick={prevSlide}>&#10094;</CarouselButton>
            <CarouselTrack $currentIndex={currentIndex} $totalImages={images.length}>
                {images.map((image, index) => (
                    <ImageWrapper key={index}>
                        <CarouselImage 
                            src={image} 
                            alt={`Carousel Image ${index + 1}`} 
                            fill
                            sizes="100vw"
                            priority={index === 0}
                        />
                    </ImageWrapper>
                ))}
            </CarouselTrack>
            <CarouselButton onClick={nextSlide}>&#10095;</CarouselButton>
            <DotsContainer>
                {images.map((_, index) => (
                    <Dot
                        key={index}
                        $active={index === currentIndex}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </DotsContainer>
        </CarouselContainer>
    );
}