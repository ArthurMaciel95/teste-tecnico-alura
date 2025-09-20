export interface CardProps {
    id: string;
    img?: string;
    title?: string;
    description?: string;
    category?: string;
    href?: string;
    slug?: string;
}

export interface RelationsPostsProps {
    RelationsPosts: CardProps[];
}