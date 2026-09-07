import { setProductPublished } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

interface HideProductButtonProps {
  id: string;
  isPublished: boolean;
}

export function HideProductButton({ id, isPublished }: HideProductButtonProps) {
  const action = setProductPublished.bind(null, id, !isPublished);

  return (
    <form action={action}>
      <Button type="submit" variant="outline" size="sm">
        {isPublished ? "Hide" : "Show"}
      </Button>
    </form>
  );
}
