type ProductTypes = {
    id: string;
    sku: string;
    name: string;
    createdAt: string;
    status: string;
    image: string;
    activity: {
        name: string;
        date: string;
        description: string;
        isPublic: boolean;
    }[]
}


export type { ProductTypes }