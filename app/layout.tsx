export default function RootLayoutt({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en">
            <body className="font-billsder">{children} </body>
        </html>
    );
}
