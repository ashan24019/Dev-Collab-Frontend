import { useState, useEffect } from "react";
import { getAllProjects } from "../api/projectApi";

export const useProjects = (initialSize = 10) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects(page, initialSize);
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

  return {
    projects,
    loading,
    error,
    page,
    totalPages,
    totalElements,
    goToPage,
    refetch: fetchProjects,
  };
};
