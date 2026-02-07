import { notFound } from "next/navigation";
import { shopItems } from "@/data/shop";
import ShopDetailClient from "@/components/ShopDetailClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ShopItemPage({ params }: PageProps) {
  const { slug } = await params;
  const item = shopItems.find((product) => product.slug === slug);

  if (!item) {
    return notFound();
  }

  return <ShopDetailClient item={item} />;
}
