import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
  CreateOrgLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const {
    getAccessToken,
    getIdToken,
    getIntegerFlag,
    getOrganization,
    getPermissions,
    getRoles,
    getStringFlag,
    getUser,
    getUserOrganizations,
    isAuthenticated,
  } = getKindeServerSession();
  const accessToken = await getAccessToken();
  const organization = await getOrganization();
  const idToken = await getIdToken();
  const permissions = await getPermissions();

  const user = await getUser();
  const userOrganizations = await getUserOrganizations();
  const authenticated = await isAuthenticated();

  return (
    <div>
      <h1>Select organization</h1>
      <select name="" id="">
        {userOrganizations?.orgs?.map((org) => (
          <option key={org.code} value={org.code}>
            {org.name}
          </option>
        ))}
      </select>
      <CreateOrgLink orgName="Hurlstone">Create org</CreateOrgLink>
      <pre>
        {JSON.stringify(
          {
            userOrganizations,
            user,
            organization,
          },
          null,
          2
        )}
      </pre>

      <LoginLink>Login</LoginLink>
      <LogoutLink>Logout</LogoutLink>
    </div>
  );
}
