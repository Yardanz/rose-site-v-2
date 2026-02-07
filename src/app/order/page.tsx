import { shopItems } from "@/data/shop";
import OrderClient from "./OrderClient";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function OrderPage({ searchParams }: PageProps) {
  const productParam = searchParams?.product;
  const slug = Array.isArray(productParam) ? productParam[0] : productParam;
  const selectedProductTitle = slug
    ? shopItems.find((item) => item.slug === slug)?.title ?? null
    : null;

  return <OrderClient selectedProductTitle={selectedProductTitle} />;
}
