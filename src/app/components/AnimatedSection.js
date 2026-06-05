"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedSection({ children, delay = 0, className = '', slideDirection = 'up', component = 'div', id = '' }) {
    const yInitial = slideDirection === 'up' ? 30 : slideDirection === 'down' ? -30 : 0;
    const xInitial = slideDirection === 'left' ? -30 : slideDirection === 'right' ? 30 : 0;

    const MotionComponent = motion[component];

    const props = {
        initial: { opacity: 0, y: yInitial, x: xInitial },
        whileInView: { opacity: 1, y: 0, x: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.6, delay, type: "spring", stiffness: 100, damping: 15 },
        className
    };

    if (id) {
        props.id = id;
    }

    return (
        <MotionComponent {...props}>
            {children}
        </MotionComponent>
    );
}
