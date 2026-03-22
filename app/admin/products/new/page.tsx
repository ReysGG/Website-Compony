import { ProductForm } from "../ProductForm";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <div className="max-w-screen mx-auto">
      <ProductForm />
    </div>
  );
}
