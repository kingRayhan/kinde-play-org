import { createKindeManagementAPIClient } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const client = await createKindeManagementAPIClient(request);
  // const org = await client.organizationsApi.createOrganization({
  //   createOrganizationRequest: {
  //     name: `${body.name}'s space`,
  //     isAllowRegistrations: false,
  //   },
  // });
  client.usersApi
    .createUser({
      createUserRequest: {
        profile: {
          familyName: body.name,
          givenName: body.name,
        },
        organizationCode: "org_5db79116500",
        identities: [
          {
            type: "email",
            details: {
              email: body.email,
              username: body.email,
              phone: "",
            },
          },
        ],
        // organizationCode: org.code,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return new Response(JSON.stringify({}));
};
