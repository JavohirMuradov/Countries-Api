import { Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import Main from "./Main/Main"
import Details from "./Details/Details"

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/countries/:name" element={<Details />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
