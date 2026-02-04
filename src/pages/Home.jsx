import { useSelector } from "react-redux";
import { useProfile } from "../hooks/useProfile";

export default function Home() {

  const myProfile = useSelector((state) => state.profile.profile);



  useProfile();


  return (
    <>
      <section>
        <h1 className="text-2xl font-bold mb-4">Welcome to Home</h1>
        <p className="text-gray-700">
          This is a clean and SEO-ready React layout template.
        </p>
        
      </section>

      {myProfile && (
        <section className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">My Profile</h2>
          <p><strong>Email:</strong> {myProfile.email}</p>
          <p><strong>Phone:</strong> {myProfile.phone}</p>
        </section>
      )}

    </>
  );
}
