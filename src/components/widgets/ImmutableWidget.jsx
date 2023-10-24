'use client'

import { useMyContext } from "@/store/passportStore";

export default function ImmutableWidget() {
  const { providerState: provider } = useMyContext()
  console.log(provider)
  return (
    <div style={{ minWidth:300, maxWidth:500 }}>
    <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "row",

        }}
      >
        <p style={{
          color: "white",
          fontSize: "24px"
        }}>Immutable</p>
      </div>
      <div
      className="tokens">

        {
          provider
            ?
            <>
        <details><summary>Id Token</summary>{provider?.user.idToken}</details>

        <details><summary>Access Token</summary>{provider?.user.accessToken}</details>

        <details><summary>Refresh Token</summary>{provider?.user.refreshToken}</details>

            </>
      :
<>
          <details>
  <summary>Id Token</summary>
        <p>
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNhYVl5dGR3d2UwMzJzMXIzVElyOSJ9.eyJwYXNzcG9ydCI6eyJldGhlcl9rZXkiOiIweDk4YjMyYjE3NzE2MTM4NzViZGJhOWI2ZWUzYjc4MTBlNGQ2MTFjMjUiLCJpbXhfZXRoX2FkZHJlc3MiOiIweDk4YjMyYjE3NzE2MTM4NzViZGJhOWI2ZWUzYjc4MTBlNGQ2MTFjMjUiLCJpbXhfc3RhcmtfYWRkcmVzcyI6IjB4MDU4N2FmMjQ1NDUxZjRhYTBhNjNlMmMxNjQ3ZmZmNzA2MzI0MmMxN2VmZTg0MGQwN2Q5NjBmMTk3ODlkM2MyYSIsImlteF91c2VyX2FkbWluX2FkZHJlc3MiOiIweDRjYjNiNWI5YzdmZGExMTcxMDRkODFjMWVlMzkzMGU5NTJlNGQ0ODkiLCJzdGFya19rZXkiOiIweDA1ODdhZjI0NTQ1MWY0YWEwYTYzZTJjMTY0N2ZmZjcwNjMyNDJjMTdlZmU4NDBkMDdkOTYwZjE5Nzg5ZDNjMmEiLCJ1c2VyX2FkbWluX2tleSI6IjB4NGNiM2I1YjljN2ZkYTExNzEwNGQ4MWMxZWUzOTMwZTk1MmU0ZDQ4OSJ9LCJlbWFpbCI6InZpY2JhbGVzZXJ2aWNlc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmltbXV0YWJsZS5jb20vIiwiYXVkIjoiUFJiTVRmZ3FrOFBDaGZocW5VMGRqa2Z5YUxVNWdDd1IiLCJpYXQiOjE2OTgxNzkxMDAsImV4cCI6MTY5ODIxNTEwMCwic3ViIjoiZW1haWx8NjUxNjRkOGM3OTNjYmZkNmJiNjU0ZjdkIiwic2lkIjoiT3RfUlVDX3M4bm9iVnhSLWdfVWVqNjhGODBJbkF0MVEifQ.Ttl5UvVeIZnHr5dVqtKj0NVJh38qk_dmpBrcEz1ooVhGXj6ryGK6jylqrLMxcgKUShyx69oiI2rx2otw1JZl7gcaoYsx2X99mlJLG76QkO5qSdCV7_VItBht18a2vpeDDKAx9gH5vNP0x8u325xrRlWNwSDEdyu80pL3UM5lDgjJInlMQs3j5aMEqW3X_pC28S_cd2pukkMULBfxjJtd_huULXG9xyMjjWgVf3C-ung93-VVM8c5yBHuE466kSwlxGpc-13QRew1CRXC2FItkgXqtF7JoHCSTjWa6-B-er1QTnw40iNcVjuNMkfCM6aeWn9FcfxJqRb8LY5yZZuEtA"</p>
</details>


          <details>
            <summary>Access Token</summary>

      <p >"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNhYVl5dGR3d2UwMzJzMXIzVElyOSJ9.eyJlbWFpbCI6InZpY2JhbGVzZXJ2aWNlc0BnbWFpbC5jb20iLCJvcmciOiI2ZmNlYzU2My02M2FjLTQxZGYtODc2OC05YjU0NjBjMzQ3YmEiLCJldGhlcl9rZXkiOiIweDk4YjMyYjE3NzE2MTM4NzViZGJhOWI2ZWUzYjc4MTBlNGQ2MTFjMjUiLCJzdGFya19rZXkiOiIweDA1ODdhZjI0NTQ1MWY0YWEwYTYzZTJjMTY0N2ZmZjcwNjMyNDJjMTdlZmU4NDBkMDdkOTYwZjE5Nzg5ZDNjMmEiLCJ1c2VyX2FkbWluX2tleSI6IjB4NGNiM2I1YjljN2ZkYTExNzEwNGQ4MWMxZWUzOTMwZTk1MmU0ZDQ4OSIsImlteF9ldGhfYWRkcmVzcyI6IjB4OThiMzJiMTc3MTYxMzg3NWJkYmE5YjZlZTNiNzgxMGU0ZDYxMWMyNSIsImlteF9zdGFya19hZGRyZXNzIjoiMHgwNTg3YWYyNDU0NTFmNGFhMGE2M2UyYzE2NDdmZmY3MDYzMjQyYzE3ZWZlODQwZDA3ZDk2MGYxOTc4OWQzYzJhIiwiaW14X3VzZXJfYWRtaW5fYWRkcmVzcyI6IjB4NGNiM2I1YjljN2ZkYTExNzEwNGQ4MWMxZWUzOTMwZTk1MmU0ZDQ4OSIsImlzcyI6Imh0dHBzOi8vYXV0aC5pbW11dGFibGUuY29tLyIsInN1YiI6ImVtYWlsfDY1MTY0ZDhjNzkzY2JmZDZiYjY1NGY3ZCIsImF1ZCI6WyJwbGF0Zm9ybV9hcGkiLCJodHRwczovL3Byb2QuaW1tdXRhYmxlLmF1dGgwYXBwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTgxNzkxMDAsImV4cCI6MTY5ODI2NTUwMCwiYXpwIjoiUFJiTVRmZ3FrOFBDaGZocW5VMGRqa2Z5YUxVNWdDd1IiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCB0cmFuc2FjdCBvZmZsaW5lX2FjY2VzcyJ9.Gw4FQFZstUPvq--RAISb7tTP03g7cbNR0ZoRxtKVrC9EHOD2skbJX-UDYz9cljtvuRgXq4K9dis6I-3s3Mc9jAAXRKpdKBnqNs50C4XioOd5kTVUXWP-8FB1WSWdre-SLcRh36xDdib0Mfw7iqdtTSpICyiDiF9ISKGvMPennBiOyzxAPb3ZJrM7NX7f_k5RebZDAQUOVvpMgPWktbt0MM_XW4xUnyyvPvLzY4qM2NQZTZe6GLAsWiBQLYmBg31BsGuCv7xeEa1ctG4usY-IRvGJoSv5nxj8CbhPyVuNyJcE-CkO7uEPaYMGZAuP_L7w14N3x_BDQs0D-_M9Y8T29g"</p>
</details>
          <details>
            <summary>Refresh Token</summary>

      <p>"v1.N2SlGTjEL_WwGmfUA90-cHauoW9WCr614X5ocuCLiUTOvo97lTPgdFtm5N3-WYUpDT-2e1QiNphAFztCHXXtjvQ"</p>
</details>
</>
}


</div>
      </div>
  );
}
