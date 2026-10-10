"use client";

import { Ellipsis, Trash2 } from "lucide-react";
import { deleteEstimateAction } from "@/app/action/estimate.action";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type EstimateMenuProps = {
  estimateId: string;
  onDeleted: (estimateId: string) => void;
};

export default function EstimateMenu({
  estimateId,
  onDeleted,
}: EstimateMenuProps) {
  const handleDelete = async () => {
    try {
      await deleteEstimateAction(estimateId);

      toast.success("견적서를 삭제했습니다.");

      // 여기서 부모에게 삭제된 ID를 전달해 목록과 건수를 갱신
      onDeleted(estimateId);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "견적서 삭제에 실패했습니다.",
      );
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" aria-label="견적서 메뉴">
            <Ellipsis />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleDelete}>
            <Trash2 size={16} />
            <span className="text-red-500">삭제</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>견적서를 삭제하시겠습니까?</AlertDialogTitle>

            <AlertDialogDescription>
              삭제한 견적서는 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>

            <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}
