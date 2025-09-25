export interface CardProps {
    img?: string;
    title?: string;
    description?: string;
    category?: string;
    href?: string;
    slug?: string;
    animationDelay?: number;
}

export interface RelationsPostsProps {
    RelationsPosts: CardProps[];
}