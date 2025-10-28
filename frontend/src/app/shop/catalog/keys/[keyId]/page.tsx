import AboutKey from "@/app/shop/catalog/keys/[keyId]/AboutKey";
import {keysCatalogDataItems} from "@/lib/data/keysCatalogData";
import NotFound from "@/app/not-found";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export async function generateMetadata({ params }) {
    const { keyId } = params;
    const product = keysCatalogDataItems.find(item => item.id === parseInt(keyId));

    if (!product) {
        NotFound();
    }

    return {
        title: `${product.name} | Patched`,
        description: `Подробная информация о ${product.name}`,
    };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function AboutKeyPage({ params }) {

    const { keyId } = params;
    const product = keysCatalogDataItems.find(item => item.id === parseInt(keyId));

    return (
        <>
            <AboutKey product={product} />
        </>
    );
}