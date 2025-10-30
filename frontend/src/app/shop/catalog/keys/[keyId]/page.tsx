import AboutKey from "@/app/shop/catalog/keys/[keyId]/AboutKey";
import {keysCatalogDataItems} from "@/lib/data/keysCatalogData";
import { notFound } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { PageProps, Metadata } from 'next';

export async function generateMetadata({ params }: PageProps<{ keyId: string }>): Promise<Metadata> {

    const { keyId } = await params;
    const product = keysCatalogDataItems.find(item => item.id === parseInt(keyId));

    if (!product) {
        return {
            title: `Товар не найден | Patched`,
            description: `Страница не найдена 404`,
        };
    }

    return {
        title: `${product.name} | Patched`,
        description: `Подробная информация о ${product.name}`,
    };
}


export default async function AboutKeyPage({ params }: PageProps<{ keyId: string }>) {

    const { keyId } = await params;
    const product = keysCatalogDataItems.find(item => item.id === parseInt(keyId));

    if (!product) {
        notFound();
    }

    return (
        <AboutKey product={product} />
    );
}