import "./css/AutorDetails.css";

const AutorDetails = ({ postAuthor }) => {
  const {
    address: {
      city,
      geo: { lat, lng },
      street,
      suite,
      zipcode,
    },
    company: { bs, catchPhrase, name: companyName },
    email,
    id,
    name,
    phone,
    username,
    website,
  } = postAuthor;

  return (
    <div className="AutorDetails">
      <p className="title">Autor:</p>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Website: {website}</p>

      <p className="title">Address</p>
      <p>City: {city}</p>
      <p>Street: {street}</p>
      <p>Suite: {suite}</p>
      <p>Zipcode: {zipcode}</p>
      <p>Geo: {lat}, {lng}</p>

      <p className="title">Company</p>
      <p>Name: {companyName}</p>
      <p>BS: {bs}</p>
      <p>Catch Phrase: {catchPhrase}</p>
    </div>
  );
};

export default AutorDetails;
