'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export default function AnimatedCounter({
    value,
    suffix = '',
    prefix = '',
    duration = 2,
    className = '',
}: Readonly<AnimatedCounterProps>) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hasAnimated, setHasAnimated] = useState(false);

    const spring = useSpring(0, {
        duration: duration * 1000,
        bounce: 0,
    });

    const display = useTransform(spring, (current) => {
        if (value >= 1000) {
            const kValue = current / 1000;
            return `${kValue.toFixed(kValue >= 100 ? 0 : kValue >= 10 ? 0 : 1)}K`;
        }
        return Math.round(current).toString();
    });

    useEffect(() => {
        if (isInView && !hasAnimated) {
            spring.set(value);
            setHasAnimated(true);
        }
    }, [isInView, hasAnimated, spring, value]);

    return (
        <motion.span ref={ref} className={className}>
            {prefix}
            <motion.span>{display}</motion.span>
            {suffix}
        </motion.span>
    );
}
