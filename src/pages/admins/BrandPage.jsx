import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { request } from "@/utils/helper/request";
import axios from "axios";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function BrandPage() {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchingData = async () => {
    const res = await request("brand", "get");
    console.log("Res from API: ", res);
    if (res) {
      setData(res?.data);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const header_tbl = ["No", "Name", "Description", "Action"];

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      const res = await request(`brand/${form?.id}`, "put", form);
      if (res) {
        console.log("Updated brand: ", res);
        // Refresh data
        fetchingData();
      }
      //Reset edit state
      setIsEdit(false);
    } else {
      const res = await request("brand", "post", form);
      if (res) {
        console.log("Created brand: ", res);
        // Refresh data
        fetchingData();
      }
    }

    console.log("Form: ", form);

    setIsOpen(false);
    // reset form
    setForm({
      id: "",
      name: "",
      description: "",
    });
  };

  const onUpdate = (itemDelete) => {
    console.log("Item Delete: ", itemDelete);
    setForm(itemDelete);
    setIsOpen(true);
    setIsEdit(true);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3 items-center">
          <h1>Brand Page</h1>
          <div className="">
            <Input placeholder="search brand" />
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Brand</DialogTitle>
            </DialogHeader>

            {/* form  */}
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <Label>Name</Label>
                  <Input
                    value={form?.name}
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
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
                      setIsOpen(false);
                      setForm({
                        id: "",
                        name: "",
                        description: "",
                      });

                      //Reset edit state
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

      {/* <h1>{data[2]?.name}</h1> */}

      {/* table for rander data */}
      <div className="mt-5">
        <Table>
          <TableCaption>A list of brand.</TableCaption>
          <TableHeader>
            <TableRow>
              {header_tbl.map((item, index) => (
                <TableHead key={index}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.description}</TableCell>
                <TableCell className={"flex flex-row gap-3"}>
                  <Button onClick={() => onUpdate(item)} variant="secondary">
                    <Edit />
                  </Button>
                  <Button
                    onClick={async () => {
                      // alert(item?.id);
                      // console.log("Item Delete: ", item);
                      const res = await request(`brand/${item?.id}`, "delete");
                      if (res) {
                        console.log("Deleted brand: ", res);
                        // Refresh data
                        fetchingData();
                      }
                    }}
                    variant="destructive"
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
