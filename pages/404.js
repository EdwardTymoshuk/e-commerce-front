import { styled } from "styled-components"
import astronaut from "@/utils/images/astronaut.png"
import Image from "next/image"
import Button from "@/components/Button"
import Link from "next/link"

// This component represents the 404 error page.
const Page404 = () => {
  // Styled component for the page wrapper, which centers its content.
  const PageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh; 
    width: 100%;
    background-color: black;
    padding: 0;
    margin: 0;
  `

  // Styled component for the message wrapper, containing the error message and an astronaut image.
  const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h2 {
      color: var(--primary-color); 
    }

    h1, p {
      color: var(--text-color); 
    }
  `

  return (
    <PageWrapper>
      <MessageWrapper>
        <h1>404 | Page not found</h1> {/* Main heading for the error */}
        <Image
          src={astronaut}
          alt="astronaut"
          width={200}
        />
        <h2>Oops! It looks like you're lost.</h2> {/* Subheading indicating the user is lost */}
        <Button><Link href="/">Back Home</Link></Button> {/* Button for returning to the home page */}
      </MessageWrapper>
    </PageWrapper>
  )
}

export default Page404
