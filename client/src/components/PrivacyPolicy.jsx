export default function PrivacyPolicy() {
  return (
    <div className=" p-2 bg-base-200 border-base-300 ">
      <h1 className=" text-center text-3xl">Privacy Policy</h1>
      <div className="divider"></div>
      <div className="p-3.5">
        <p className="text-center text-primary pb-10">
          This application is a student project developed for educational
          purposes only.
        </p>
        <h2 className="font-semibold text-lg">Data collected</h2>
        <p className="pb-5">
          The application may store basic account information such as your name,
          email address, and password (encrypted). Data is stored in a MongoDB
          database.
        </p>
        <h2 className="font-semibold text-lg">Purpose of data</h2>
        <p className="pb-5">
          The information is used solely to demonstrate the functionality of the
          application (e.g., user login, game library management).
        </p>
        <h2 className="font-semibold text-lg">No third-party sharing</h2>
        <p className="pb-5">
          Your data is not shared with third parties or used for any commercial
          purposes.
        </p>
        <h2 className="font-semibold text-lg">Cookies</h2>
        <p className="pb-5">
          An authentication cookie is used to keep you logged in. This cookie is
          only used for session management.
        </p>
        <h2 className="font-semibold text-lg">Data retention</h2>
        <p className="pb-5">
          Data may be removed at any time, as this project is not a production
          service.
        </p>
        <h2 className="font-semibold text-lg">Contact</h2>
        <p className="pb-5">
          For any questions regarding this Privacy Policy, please contact the
          project developer. sv004212@edu.taitotalo.fi
        </p>
      </div>
    </div>
  );
}
