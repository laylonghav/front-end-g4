import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { configs } from "@/utils/config/configs";
import { formatDate } from "@/utils/helper/format";
import { request } from "@/utils/helper/request";
import { Edit, Image, Plus, Search, SearchSlash, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [data, setData] = useState([]);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdite, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    qty: 0,
    price: 0,
    discount: 0,
    status: false,
    category_id: "",
    brand_id: "",
    image: null,
  });

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState(null);
  // For search
  const [query, setQuery] = useState("");

  //Fecthing data
  async function fetchingData() {
    setLoading(true);
    const res = await request("product", "get");
    const brand = await request("brand", "get");
    if (brand) {
      setBrand(brand?.data);
      console.log("Res API brand: ", brand?.data);
    }
    const category = await request("category", "get");
    if (category) {
      setCategory(category?.data);
      console.log("Res API Category: ", category?.data);
    }
    console.log("Res API: ", res?.data);
    if (res) {
      setData(res?.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchingData();
  }, []);

  const header_tbl = [
    "No",
    "Name",
    "Description",
    "Quantity",
    "Price",
    "Discount",
    "Status",
    "Brand",
    "Category",
    "Image",
    "Actions",
  ];

  async function onSubmit(e) {
    e.preventDefault();
    console.log("Form Data: ", form);

    // using Form for upload image and data
    const form_data = new FormData();
    form_data.append("name", form?.name);
    form_data.append("description", form?.description);
    form_data.append("price", form?.price);
    form_data.append("qty", form?.qty);
    form_data.append("discount", form?.discount);
    form_data.append("status", form?.status ? 1 : 0);
    form_data.append("brand_id", form?.brand_id);
    form_data.append("category_id", form?.category_id);

    if (form?.image instanceof File) {
      form_data.append("image", form?.image);
    }

    if (isEdite) {
      form_data.append("_method", "put");
      const res = await request(`product/${form?.id}`, "post", form_data);
      if (res) {
        console.log("Edited Product : ", res);
        // Refresh data
        fetchingData();
      }
      // reset state isEdit
      setIsEdit(false);
    } else {
      const res = await request("product", "post", form_data);
      if (res) {
        console.log("Created Product : ", res);
        // Refresh data
        fetchingData();
      }
    }

    // Close Dialog
    setIsOpen(false);
    //Reset Form
    setForm({
      name: "",
      description: "",
      qty: 0,
      price: 0,
      discount: 0,
      status: false,
      category_id: "",
      brand_id: "",
      image: null,
    });
  }

  const onDelete = (item_delete) => {
    console.log("Item delete: ", item_delete);
    // Open dialog for delete
    setIsOpenDelete(true);
    setItemDelete(item_delete);
  };

  const onUpdate = (itemEdit) => {
    console.log("Item edit: ", itemEdit);
    setIsOpen(true);
    setForm(itemEdit);
    setIsEdit(true);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3 items-center">
          <h1>Product Page</h1>
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
              const res = await request(`product/search/?q=${query}`);
              if (res) {
                setLoading(false);
                console.log("Search Product : ", res);
                // New Category data to render on Table
                setData(res?.data);
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
              <DialogTitle>Create Product</DialogTitle>
            </DialogHeader>

            {/* form  */}
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-3 w-full">
                  <div className="flex flex-col gap-3  w-full">
                    <Label>Name</Label>
                    <Input
                      value={form?.name}
                      placeholder="Name"
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-3  w-full">
                    <Label>Price</Label>
                    <Input
                      type={"number"}
                      value={form?.price}
                      placeholder="Price"
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-3 w-full">
                  <div className="flex flex-col gap-3  w-full">
                    <Label>Quantity</Label>
                    <Input
                      type={"number"}
                      value={form?.qty}
                      placeholder="Quantity"
                      onChange={(e) =>
                        setForm({ ...form, qty: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-3  w-full">
                    <Label>Discount</Label>
                    <Input
                      type={"number"}
                      value={form?.discount}
                      placeholder="Discount"
                      onChange={(e) =>
                        setForm({ ...form, discount: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-3 w-full">
                  <div className="flex flex-col gap-3  w-full">
                    <Label>Category</Label>
                    <Select
                      value={form?.category_id}
                      onValueChange={(value) =>
                        setForm({ ...form, category_id: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Array.isArray(category) &&
                            category.map((item, index) => (
                              <SelectItem value={item?.id}>
                                {item?.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-3  w-full">
                    <Label>Brand</Label>
                    <Select
                      value={form?.brand_id}
                      onValueChange={(value) =>
                        setForm({ ...form, brand_id: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Array.isArray(brand) &&
                            brand.map((item, index) => (
                              <SelectItem value={item?.id}>
                                {item?.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-row gap-3  w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <Label>Status</Label>
                    <Select
                      value={String(form.status)}
                      onValueChange={(value) =>
                        setForm({ ...form, status: value === "true" })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="true">Active</SelectItem>
                          <SelectItem value="false">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <Label>Description</Label>
                    <Input
                      value={form?.description}
                      placeholder="Description"
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Image</Label>
                  <Input
                    type={"file"}
                    placeholder="Upload image"
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.files[0] })
                    }
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className={"h-28 w-28"}>
                    {form?.image && (
                      <img
                        className="w-full h-full p-2 rounded-2xl bg-gray-100 overflow-hidden"
                        src={
                          form?.image instanceof File
                            ? URL.createObjectURL(form?.image)
                            : form?.image_url
                        }
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-3 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      // Close Dialog
                      setIsOpen(false);
                      //Reset Form
                      setForm({
                        name: "",
                        description: "",
                        qty: 0,
                        price: 0,
                        discount: 0,
                        status: false,
                        category_id: "",
                        brand_id: "",
                        image: null,
                      });
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
            <DialogTitle>Do you want to delete this Product ? </DialogTitle>
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
                  `product/${itemDelete?.id}`,
                  "delete",
                );
                if (res) {
                  console.log("Deleted Product: ", res);
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
              <TableCell colSpan={11}>
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
                  <TableCell>{item?.qty}</TableCell>
                  <TableCell>${item?.price}</TableCell>
                  <TableCell>{item?.discount}%</TableCell>
                  <TableCell>
                    {item?.status ? (
                      <Badge variant="">Active</Badge>
                    ) : (
                      <Badge variant="outline">Inactive</Badge>
                    )}
                  </TableCell>
                  {/* <TableCell>{formatDate(item?.created_at)}</TableCell>
                  <TableCell>{formatDate(item?.updated_at)}</TableCell> */}
                  <TableCell>{item?.brand?.name ?? "Unknow"}</TableCell>
                  <TableCell>{item?.category?.name ?? "Unknow"}</TableCell>
                  <TableCell className={"h-28 w-28"}>
                    {item?.image_url ? (
                      <img
                        className="w-full h-full p-2 rounded-2xl bg-gray-100 overflow-hidden"
                        src={item?.image_url}
                      />
                    ) : (
                      <div className={"h-28 w-28"}>
                        <div className="w-full h-full p-2 rounded-2xl bg-gray-100 overflow-hidden flex justify-center items-center">
                          <div className="flex flex-col gap-1 items-center ">
                            <Image className="size-8" />

                            <p className="text-foreground">No image</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex flex-row gap-3">
                        <Button
                          onClick={() => onUpdate(item)}
                          variant={"outline"}
                        >
                          <Edit />
                        </Button>
                        <Button
                          onClick={() => onDelete(item)}
                          variant="destructive"
                        >
                          <Trash />
                        </Button>
                      </div>
                    </div>
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
