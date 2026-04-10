import {
    activateSubscription,
    createSubscription,
    deactivateSubscription,
    getSubscriptionStatus,
} from "@/lib/server/vercel-daily-api";
import { NextRequest, NextResponse } from "next/server";

const SUBSCRIPTION_COOKIE_NAME = "vercel-daily-subscription-token";

const subscriptionCookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
};

export async function GET(request: NextRequest) {
    const token = request.cookies.get(SUBSCRIPTION_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json({
            success: true,
            data: { isSubscribed: false },
        });
    }

    const subscription = await getSubscriptionStatus(token);
    const response = NextResponse.json({
        success: true,
        data: { isSubscribed: subscription?.status === "active" },
    });

    if (!subscription) {
        response.cookies.delete(SUBSCRIPTION_COOKIE_NAME);
    }

    return response;
}

export async function POST(request: NextRequest) {
    const cookieToken = request.cookies.get(SUBSCRIPTION_COOKIE_NAME)?.value;
    let token = cookieToken;

    if (!token) {
        const createdSubscription = await createSubscription();

        if (!createdSubscription?.token) {
            return NextResponse.json(
                { success: false, error: { message: "Failed to create subscription." } },
                { status: 502 },
            );
        }

        token = createdSubscription.token;
    }

    let activatedSubscription = await activateSubscription(token);

    if (!activatedSubscription && cookieToken) {
        const createdSubscription = await createSubscription();

        if (!createdSubscription?.token) {
            return NextResponse.json(
                { success: false, error: { message: "Failed to create subscription." } },
                { status: 502 },
            );
        }

        token = createdSubscription.token;
        activatedSubscription = await activateSubscription(token);
    }

    if (!activatedSubscription) {
        return NextResponse.json(
            { success: false, error: { message: "Failed to activate subscription." } },
            { status: 502 },
        );
    }

    const response = NextResponse.json({
        success: true,
        data: { isSubscribed: activatedSubscription.status === "active" },
    });

    response.cookies.set(
        SUBSCRIPTION_COOKIE_NAME,
        activatedSubscription.token,
        subscriptionCookieOptions,
    );

    return response;
}

export async function DELETE(request: NextRequest) {
    const token = request.cookies.get(SUBSCRIPTION_COOKIE_NAME)?.value;

    if (token) {
        await deactivateSubscription(token);
    }

    const response = NextResponse.json({
        success: true,
        data: { isSubscribed: false },
    });

    response.cookies.delete(SUBSCRIPTION_COOKIE_NAME);

    return response;
}
