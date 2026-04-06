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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addUser, deleteUser, updateUser } from "@/store/usersSlice";
import { Edit, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: "",
    user_label: "",
    username: "",
    password: "",
    role: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [itemDelate, setItemDelete] = useState(null);

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // const data = [
  //   {
  //     user_label: "Lay longhav",
  //     username: "laylonghav",
  //     password: "123456",
  //     role: "Admin",
  //   },
  //   {
  //     user_label: "Nang",
  //     username: "nang",
  //     password: "654321",
  //     role: "User",
  //   },
  //   {
  //     user_label: "Meng",
  //     username: "meng",
  //     password: "098765",
  //     role: "manager",
  //   },
  // ];

  const onSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      // setData(data.map((item) => (item?.id === form?.id ? form : item)));
      dispatch(updateUser({ id: form?.id, data: form }));
      setIsEdit(false);
    } else {
      // setData([...data, { ...form, id: Date.now() }]);
      dispatch(addUser({ ...form, id: Date.now() }));
    }
    console.log("Form Data: ", { ...form, id: Date.now() });

    setIsOpen(false);
    setForm({
      id: "",
      user_label: "",
      username: "",
      password: "",
      role: "",
    });
  };

  const dataFilter = users?.filter(
    (item) =>
      item?.user_label.toLowerCase().includes(query.toLowerCase()) ||
      item?.username.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-row items-center gap-2">
          <h1>User</h1>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search"
          />
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button>
              Create <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create user</DialogTitle>
            </DialogHeader>

            <form action="" className="flex flex-col gap-3" onSubmit={onSubmit}>
              <div className="flex flex-col gap-2">
                <Label>User label</Label>
                <Input
                  value={form?.user_label}
                  onChange={(e) =>
                    setForm({ ...form, user_label: e.target.value })
                  }
                  placeholder="User label"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Username</Label>
                <Input
                  value={form?.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  placeholder="Username"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <Input
                  value={form?.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Password"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Role</Label>
                <Input
                  value={form?.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Password"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    setIsEdit(false);
                    setForm({
                      id: "",
                      user_label: "",
                      username: "",
                      password: "",
                      role: "",
                    });
                  }}
                  type="button"
                  variant="outline"
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  className={"bg-green-500 hover:bg-green-600"}
                >
                  Save
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isDelete} onOpenChange={setIsDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Do you want to delete data ?</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => {
                setIsDelete(false);
                setItemDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(deleteUser(itemDelate?.id));
                setIsDelete(false);
              }}
            >
              Ok
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-5">
        <Table>
          <TableCaption>List user</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User label</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(dataFilter) && dataFilter.length ? (
              <>
                {dataFilter.map((item, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.user_label}</TableCell>
                    <TableCell>{item?.username}</TableCell>
                    <TableCell>{item?.password}</TableCell>
                    <TableCell>{item?.role}</TableCell>
                    <TableCell className={"flex flex-row gap-1"}>
                      <Button
                        onClick={() => {
                          setIsOpen(true);
                          console.log("Item edit: ", item);
                          setForm(item);
                          setIsEdit(true);
                        }}
                        variant="secondary"
                      >
                        <Edit />
                      </Button>
                      <Button
                        onClick={() => {
                          console.log("Item delete: ", item);
                          // setData(
                          //   data.filter((item1) => item1?.id !== item?.id),
                          // );
                          // dispatch(deleteUser(item?.id));
                          setIsDelete(true);
                          setItemDelete(item);
                        }}
                        variant="destructive"
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow cl>
                <TableCell className={""} colSpan={6}>
                  <div className="flex justify-center mt-3">No Data</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
