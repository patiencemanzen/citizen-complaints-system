import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    isLoading?: boolean;
    as?: 'button' | 'a' | 'submit';
    href?: string;
}

const variantClasses = {
    primary:
        'bg-gradient-to-b from-gray-900 to-black hover:from-indigo-500 text-gray-200 border border-gray-800',
    secondary:
        'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600',
    danger:
        'bg-red-600 hover:bg-red-700 text-white border border-red-700',
};

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    as = 'button',
    href,
    className = '',
    ...props
}) => {
    const classes = [
        'self-start px-3 py-2 leading-none rounded-lg focus:outline-none focus:shadow-outline',
        variantClasses[variant],
        className,
        isLoading ? 'opacity-50 cursor-not-allowed' : '',
    ].join(' ');

    if (as === 'a' && href) {
        // Only pick anchor-specific props
        const {
            onClick,
            id,
            style,
            title,
            tabIndex,
            ...rest
        } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
        const { target, rel } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;

        return (
            <a
                href={href}
                className={classes}
                aria-disabled={isLoading}
                tabIndex={isLoading ? -1 : tabIndex}
                onClick={onClick}
                target={target}
                rel={rel}
                id={id}
                style={style}
                title={title}
                {...rest}
            >
                {isLoading ? 'Loading...' : children}
            </a>
        );
    }

    // Determine button type
    let buttonType: "button" | "submit" | "reset" = "button";
    if (as === "submit") {
        buttonType = "submit";
    } else if (props.type) {
        buttonType = props.type as typeof buttonType;
    }

    return (
        <button
            type={buttonType}
            className={classes}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
};

export default Button;