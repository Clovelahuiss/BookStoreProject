// src/components/Breadcrumb.tsx
import Link from 'next/link';

interface BreadcrumbProps {
    path: { name: string; href?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path }) => (
    <nav className="text-gray-600 text-sm mb-4">
        {path.map((item, index) => (
            <span key={index}>
                {item.href ? (
                    <Link href={item.href} className="text-blue-600 hover:underline">
                        {item.name}
                    </Link>
                ) : (
                    <span className="text-gray-500">{item.name}</span>
                )}
                {index < path.length - 1 && ' > '}
            </span>
        ))}
    </nav>
);

export default Breadcrumb;
