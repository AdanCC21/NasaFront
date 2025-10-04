import React from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

interface Props extends PressableProps {
    children: string;
    color?: string;
    variant?: 'contained' | 'text-only';
    className?: string;
}

const CustomButton = React.forwardRef<View, Props>(
    ({
        children,
        color = 'primary',
        onPress,
        onLongPress,
        variant = 'contained',
        className,
        ...restProps
    }, ref) => {

        const btnColor = color ? `bg-${color}` : 'bg-primary';
        const textColor = color ? `text-${color}` : 'text-primary';

        if (variant === 'text-only') {
            return (
                <Pressable
                    className={`p-3 ${className}`}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    ref={ref}
                    {...restProps}
                >
                    <Text className={`text-center ${textColor} font-work-medium`}>{children}</Text>
                </Pressable>
            );
        }

        return (
            <Pressable
                className={`p-3 rounded-md ${btnColor} active:opacity-90 ${className}`}
                onPress={onPress}
                onLongPress={onLongPress}
                ref={ref}
                {...restProps}
            >
                <Text className='text-white text-center'>{children}</Text>
            </Pressable>
        );
    });

export default CustomButton;