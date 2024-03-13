import * as React from "react";
import { CssVarsProvider, VariantProp } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import LinearProgress from "@mui/joy/LinearProgress";
import { signIn, useSession } from "next-auth/react";
import Stack from "@mui/joy/Stack";
import { useRouter } from "next/router";
 
export default function Redirect() {
  const router = useRouter();
  const { data: session } = useSession();

  React.useEffect(() => {
    const isloggedin = async () => {
      const id = await (() => {
        const data: any = session?.user;
        const id = data?.user?.id;
        return id;
      })();
      if (!id) {
        signIn();
      } else {
        router.push("/home");
      }
    };
    isloggedin();
  });
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "row",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          ></Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Stack spacing={2} sx={{ flex: 1 }}>
              <LinearProgress
                color="primary"
                variant="plain"
                size="sm"
                thickness={1}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
