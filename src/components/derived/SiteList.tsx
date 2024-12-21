import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa"; // Import FaPlus for "+" icon
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type Site = {
  _id: string;
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  Location: string;
};

export default function SiteList() {
  const [data, setData] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("/api/data/SiteData")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setData([]);
        setLoading(false);
      });
  }, []);

  // Filter and pagination logic
  const filteredData = data.filter((site) =>
    site.Location.toLowerCase().includes(filterLocation.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const deleteSite = async (id: string) => {
    try {
      await axios.delete(`/api/data/SiteData/${id}`);
      setData(data.filter((site) => site._id !== id));
    } catch (error) {
      console.error("Failed to delete site:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-[900px] p-4 h-[500px] mx-auto">
      <div className="flex items-center justify-center py-4">
        <Input
          placeholder="Filter Location..."
          value={filterLocation}
          onChange={(event) => setFilterLocation(event.target.value)}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
            <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger><Link href={"/Dashboard/AddSite"}><FaPlus/></Link></TooltipTrigger>
                  <TooltipContent>
                    <p>Add Site</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* Display the "+" icon */}
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>

      <div className="overflow-x-auto border">
        <table className="min-w-full table-auto text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length ? (
              paginatedData.map((site) => (
                <tr key={site._id}>
                  <td className="px-4 py-2">
                    <Link href={`/Dashboard/sites/${site.id}`}>
                      {site.Location}
                    </Link>
                  </td>
                  <td className="px-4 py-2 capitalize">{site.status}</td>
                  <td className="px-4 py-2">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "INR",
                    }).format(site.amount)}
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      color="destructive"
                      onClick={() => deleteSite(site._id)}
                      className="h-8 w-8 p-0"
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground text-center">
          {paginatedData.length} of {filteredData.length} row(s) displayed.
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
