import {useState} from 'react'
import './App.css'
function Card({ data, isBaseline, setBaseline, setter, setSetter }) { // Add setter here as a prop
  return (
    <div className={`card flex-row ${isBaseline ? "baseline" : ""}`}>
      <img src={data.image} className="book" alt={data.title} />
      <div className="flex-column info">
        <div className="title">{data.title}</div>
        <div className="author">{data.author}</div>
        <div className={`hidden bottom summary ${isBaseline ? "show" : ""}`}>
          {data.describe}
        </div>
      </div>
      {!isBaseline && (
        <button
          disabled={setter} // Use the setter prop to control the disabled state
          onClick={() => {
            setSetter(true); // This disables the button across all cards
            setBaseline(data); // Sets the current card as the baseline
          }}
          className="baseline-btn"
        >
          Baseline
        </button>
      )}
    </div>
  );
}



function App() {
  const [baselineCard, setBaselineCard] = useState(null);
  const [newCardData, setNewCardData] = useState({
    title: "",
    author: "",
    describe: "",
    image: "",
  });
  const [setter, setSetter] = useState(false);
  const [cardsData, setCardsData] = useState([
    {
      title: "Mocking Bird",
      author: "Some Author",
      describe:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor repellendus enim repellat quia ut ullam necessitatibus, perspiciatis, eum debitis dolores illo ea quas commodi fugit eius veniam quidem autem.",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51N5qVjuKAL._SX309_BO1,204,203,200_.jpg",
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      describe:
        "The Great Gatsby is a novel by F. Scott Fitzgerald that tells the story of Jay Gatsby and his obsession with Daisy Buchanan during the Roaring Twenties in the United States.",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51N5qVjuKAL._SX309_BO1,204,203,200_.jpg",
    },
    // Add more card data as needed
  ]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateCard = () => {
    const newCard = { ...newCardData };
    setCardsData((prevCardsData) => [...prevCardsData, newCard]);
    setNewCardData({
      title: "",
      author: "",
      describe: "",
      image: "",
    });
  };

  return (
    <div>
      <div className="card-input">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newCardData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newCardData.author}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="describe"
          placeholder="Description"
          value={newCardData.describe}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newCardData.image}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateCard}>Create Card</button>
      </div>
      {cardsData.map((data, index) => (
        <Card
          key={index}
          data={data}
          isBaseline={baselineCard === data}
          setBaseline={setBaselineCard}
          setter={setter} // Pass the setter state to the Card component
          setSetter={setSetter}
        />
      ))}
    </div>
  );
}

export default App;
