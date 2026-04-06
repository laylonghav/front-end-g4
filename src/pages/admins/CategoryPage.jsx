import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/helper/format";
import { request } from "@/utils/helper/request";
import axios from "axios";
import { Edit, Plus, Search, SearchSlash, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
  });

  const [itemDelete, setItemDelete] = useState(null);

  // For search
  const [query, setQuery] = useState("");

  const fetchingData = async () => {
    setLoading(true);
    const res = await request("category", "get");
    console.log("Res API: ", res);
    if (res) {
      setData(res?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const header_tbl = [
    "No",
    "Name",
    "Description",
    "Created at",
    "Updated at",
    "Actions",
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data: ", form);

    if (isEdit) {
      // Update Category
      const res = await request(`category/${form?.id}`, "put", form);
      if (res) {
        console.log("Updated Category: ", res);
        // Refresh data from API to render Table
        fetchingData();
      }
      //Reset isEdit
      setIsEdit(false);
    } else {
      // Create Category
      const res = await request("category", "post", form);
      if (res) {
        console.log("Created Category: ", res);
        // Refresh data from API to render Table
        fetchingData();
      }
    }

    // Close Dialog
    setIsOpen(false);
    //Reset Form
    setForm({ id: "", name: "", description: "" });
  };

  const onEdit = (itemEdit) => {
    console.log("Item edit: ", itemEdit);
    setIsOpen(true);
    setForm(itemEdit);
    setIsEdit(true);
  };
  const onDelete = (itemDelete) => {
    console.log("Item Delete: ", itemDelete);
    setItemDelete(itemDelete);
    setIsOpenDelete(true);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3 items-center">
          <h1>Brand Page</h1>
          <div className="">
            <Input
              value={query}
              placeholder="search brand"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <Button
            onClick={async () => {
              setLoading(true);
              const res = await request(`category/search/?q=${query}`, "get");
              if (res) {
                setLoading(false);
                console.log("Search Category : ", res);
                // New Category data to render on Table
                setData(res?.data?.data);
              }
            }}
          >
            <Search />
          </Button>

          <Button
            onClick={() => {
              // Set all category data ot render on Table
              fetchingData();
              setQuery("");
            }}
          >
            <SearchSlash />
          </Button>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEdit ? "Update" : "Create"} Category</DialogTitle>
            </DialogHeader>

            {/* form  */}
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-3">
                <Label>Name</Label>
                <Input
                  value={form?.name}
                  placeholder="Name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <div className="flex flex-col gap-3">
                  <Label>Description</Label>
                  <Input
                    value={form?.description}
                    placeholder="Description"
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-row gap-3 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      // Close Dialog
                      setIsOpen(false);
                      //Reset Form
                      setForm({ id: "", name: "", description: "" });
                      //Reset isEdit
                      setIsEdit(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do you want to delete this category ? </DialogTitle>
          </DialogHeader>
          <div className="flex flex-row gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                // Close Dialog
                setIsOpenDelete(false);
                //Reset ItemDelete
                setItemDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                // Delete Category
                const res = await request(
                  `category/${itemDelete?.id}`,
                  "delete",
                );
                if (res) {
                  console.log("Deleted Category: ", res);
                  // Refresh data from API to render Table
                  fetchingData();
                  //Reset ItemDelete
                  setItemDelete(null);
                  // Close Dialog
                  setIsOpenDelete(false);
                }
              }}
              variant="destructive"
            >
              Ok
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {header_tbl?.map((item, index) => (
              <TableHead> {item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="flex justify-center mt-5">
                  <Spinner className={"size-10"} />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {data?.map((item, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>{item?.description}</TableCell>
                  <TableCell>{formatDate(item?.created_at)}</TableCell>
                  <TableCell>{formatDate(item?.updated_at)}</TableCell>
                  <TableCell className={"flex flex-row gap-3"}>
                    <Button variant={"outline"} onClick={() => onEdit(item)}>
                      <Edit />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => onDelete(item)}
                    >
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
