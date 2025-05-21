import TopRatedProductSlider from "../../components/TopRatedProductSlider/TopRatedProductSlider";

function Home() {
  return (
    <div>
      <h1>Velkommen til MiniShop</h1>
      <p>We are ready to sell you stuff that you need. And also stuff that you really don't need.</p>
      <div>
        <TopRatedProductSlider />
      </div>
    </div>
  );
}

export default Home;
