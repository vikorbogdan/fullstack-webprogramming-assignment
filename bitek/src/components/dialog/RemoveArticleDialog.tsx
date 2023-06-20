import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { api } from "~/utils/api";

type RemoveArticleDialogProps = {
  articleId: string | null;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteDialogOpen: boolean;
  setArticleId: React.Dispatch<React.SetStateAction<string | null>>;
};

const RemoveArticleDialog: React.FC<RemoveArticleDialogProps> = ({
  articleId,
  setDeleteDialogOpen,
  deleteDialogOpen,
  setArticleId,
}) => {
  const handleCancel = () => {
    setDeleteDialogOpen(false);
  };
  const ctx = api.useContext();
  const { mutate: deleteArticle, isLoading: isDeleteLoading } =
    api.article.deleteArticleById.useMutation({
      onSuccess: () => {
        void ctx.article.getArticlesByUserId.invalidate();
      },
    });

  const handleDelete = () => {
    if (articleId) {
      deleteArticle(articleId);
      setArticleId(null);
    }
  };
  useEffect(() => {
    if (!isDeleteLoading) {
      setDeleteDialogOpen(false);
    }
  }, [isDeleteLoading, setDeleteDialogOpen]);

  return (
    <Transition
      show={deleteDialogOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog
        className="relative z-50"
        onClose={() => setDeleteDialogOpen(false)}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-xl bg-white p-10">
            {isDeleteLoading ? (
              "Cikk törlése..."
            ) : (
              <>
                <Dialog.Title>Cikk törlése</Dialog.Title>
                <Dialog.Description>
                  Biztosan törölni szeretnéd a cikket?
                </Dialog.Description>
                <div className="mt-5 flex flex-row justify-between gap-5">
                  <button
                    className="rounded-lg bg-lime-50 p-3"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded-lg bg-red-500 p-3 text-white"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RemoveArticleDialog;
