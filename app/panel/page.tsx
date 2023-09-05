import { Container, Button, Row } from "@yakad/ui";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserProfile, UserProfile } from "./profile/profile";

export default async function Page() {
    const cookie = cookies();
    const token = cookie.get("token") || redirect("/account/login");

    const profile = await (async () => {
        const profileFromApi = await getUserProfile(token.value);

        return profileFromApi.status === 401
            ? redirect("/account/login")
            : profileFromApi.json();
    })();

    return (
        <Container>
            <Row>
                <Link href="./panel/account">
                    <Button variant="filledtonal">Accounts</Button>
                </Link>
            </Row>
        </Container>
    );
}
