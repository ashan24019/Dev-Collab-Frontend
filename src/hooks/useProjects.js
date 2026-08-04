import { useState, useEffect } from "react";
import { getAllProjects } from "../api/projectApi";
import { useDebounce } from "./useDebounce";

export const useProjects = (initialSize = 10) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchName, setSearchName] = useState('')

  const deboucedName = useDebounce(searchName, 400)

  useEffect(() => {
    fetchProjects();
  }, [page, deboucedName]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects(page, initialSize, deboucedName);
      setProjects(data.content);
      setTotalPages(data.totalPages)
      setTotalElements(data.totalElements)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage)
    }
  }

  const resetAndRefetch = () => {
    setPage(0)
  }

  const search = (name) => {
    setSearchName(name);
    setPage(0)
  }

  return {
    projects,
    loading,
    error,
    page,
    totalPages,
    totalElements,
    goToPage,
    search,
    searchName,
    resetAndRefetch
  };
};
