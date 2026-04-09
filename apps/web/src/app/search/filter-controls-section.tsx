import { getCategories } from "@/lib/server/vercel-daily-api";
import { FilterControls } from "./filter-controls";

type FilterControlsSectionProps = {
  currentCategory?: string;
  currentSearch?: string;
};

export async function FilterControlsSection({
  currentCategory,
  currentSearch,
}: FilterControlsSectionProps) {
  const categories = await getCategories();

  return (
    <FilterControls
      currentCategory={currentCategory}
      currentSearch={currentSearch}
      categories={categories}
    />
  );
}
