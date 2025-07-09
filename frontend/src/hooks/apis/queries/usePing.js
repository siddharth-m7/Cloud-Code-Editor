import { use } from "react";
import { pingApi } from "../../../apis/ping";
import { useQuery } from '@tanstack/react-query';

export default function usePing() {
    const { isLoading, isError, data, error } = useQuery({
        queryFn: pingApi,
        queryKey: ['ping'],
        staleTime: 10000
});
    return { isLoading, isError, data, error };
}
