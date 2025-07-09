import { useQuery } from '@tanstack/react-query';
import { getProjectTree } from '@/services/projectService';

export const usePrjectTree = (projectId) => {
    const { data, isLoading, isError, error } = useQuery({
        queryfn : () => getProjectTree({ projectId })
    });

    return {
        data,
        isLoading,
        isError,
        error
    };
}