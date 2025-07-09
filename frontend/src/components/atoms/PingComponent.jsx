import usePing from "../../hooks/apis/queries/useping.js";

export default function PingComponent() {const { isLoading , data } = usePing();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
       <h1>Ping Response { data.message}</h1>
      </div>
    </>
  )
}