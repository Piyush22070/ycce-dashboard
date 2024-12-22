import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FaTrash, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [showDialog, setShowDialog] = useState(false);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  useEffect(() => {
    axios
      .get("/api/data/SiteData")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error: unknown) => {
        setData([]);
        setLoading(false);
        if(error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      });
  }, []);

  const filteredData = data.filter((site) =>
    site.Location.toLowerCase().includes(filterLocation.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleDeleteClick = (site: Site) => {
    setSelectedSite(site);
    setShowDialog(true);
  };

  const deleteSite = async () => {
    if (selectedSite) {
      try {
        await axios.delete(`/api/data/SiteData/${selectedSite._id}`);
        setData(data.filter((site) => site._id !== selectedSite._id));
        setShowDialog(false);
        location.reload()
      } catch (error) {
        console.error("Failed to delete site:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-[900px] p-4 h-[500px] mx-auto relative">
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Site</h3>
            <p className="mb-6">Do you want to delete this site?</p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-slate-500  text-white rounded-md hover:bg-slate-600"
                onClick={deleteSite}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
                      onClick={() => handleDeleteClick(site)}
                      className="h-8 w-8 p-0  "
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