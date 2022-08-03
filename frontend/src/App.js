import './App.css';
import React from 'react';
import Buffer from 'buffer';
//import request from 'request';
//import ReactDOM from 'react-dom';

var DjangoHost = 'http://10.0.0.13:8000/';
var client_id = 'b5111ea315fa44f5b9082b3f17b30a6f';
var client_secret = '6df234839f3b40ef9304e0c7724f8b39';
var access_token = null;
var refresh_token = null;

function App () {
	return (
		<div className="App">
			<SearchSide />
			<QueueSide />
		</div>
	);
}
function SearchSide () {
	const [
		results,
		setResults
	] = React.useState({
		songs: [
			{ title: 'future song list', artist: '', album: '', album_art: '', id: '' }
		]
	});

	function search (query) {
		setResults({
			songs: [
				{ title: 'loading...', artist: '', album: '', album_art: '', id: '' }
			]
		});
		fetch(DjangoHost + 'songqueue/search?query=' + query)
			.then((response) => response.json())
			.then((data) => {
				setResults(data);
			})
			.catch(
				setResults({
					songs: [
						{ title: 'Server Not found', artist: '', album: '', album_art: '', id: '' }
					]
				})
			);
	}
	return (
		<div className="SearchSide">
			<h1>Search</h1>
			<AddTextInputForm func={search} placeholder="Enter text to search" buttonText="Search" />
			<SearchResults results={results.songs} />
		</div>
	);
}
function QueueSide () {
	var loggedIn = false;
	return (
		<div className="QueueSide">
			<h1>Queue</h1>
			<Auth />
		</div>
	);
}

function Auth () {
	function HandleClick () {

		function HandleAuthResponse () {
			if (this.status == 200) {
			  var data = JSON.parse(this.responseText);
				console.log(data);
				if (data.access_token != undefined) {
					access_token = data.access_token;
					localStorage.setItem('access_token', access_token);
				}
				if (data.refresh_token != undefined) {
					refresh_token = data.refresh_token;
					localStorage.setItem('refresh_token', refresh_token);
				}
			}
		}

		if (window.location.href.includes('code')) {
			var code = window.location.href.split('code=')[1];
			let body =
				'grant_type=authorization_code&code=' +
				code +
				'&redirect_uri=' +
				encodeURI('http://localhost:3000') +
				'&client_id=' +
				client_id +
				'&client_secret=' +
				client_secret;
			let xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://spotify.com/api/token', true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ':' + client_secret));
			xhr.send(body);
			xhr.onload = HandleAuthResponse;
		} else {
			var payload = {
				response_type: 'code',
				client_id: client_id,
				scope: 'user-read-private user-read-email',
				redirect_uri: 'http://localhost:3000'
			};
			var url = 'https://accounts.spotify.com/authorize?' + new URLSearchParams(payload);
			window.location.href = url;
		}
	}
	return (
		<div className="Auth">
			<button onClick={HandleClick}>Login</button>
		</div>
	);
}

function SearchResults (props) {
	console.log(props.results);
  var i = 0;
	if (props.results.hasOwnProperty('songs')) {
		return;
	}
	return (
		<div className="SearchResult">
			{props.results.map(function (song) {
        i++;
				return <p className="result" key={i}>{song.title}</p>;
			})}
		</div>
	);
}

function AddTextInputForm (props) {
	const [
		name,
		setName
	] = React.useState();

	function handleSubmit (e) {
		e.preventDefault();
		var formatedName = '';
		if (name == null) {
			formatedName = 'cage';
		} else {
			formatedName = name;
		}
		props.func(formatedName);
	}
	return (
		<form onSubmit={props.func != null ? props.func : handleSubmit}>
			<input onChange={(e) => setName(e.target.value)} placeholder={props.placeholder} />
			<button onClick={handleSubmit}>{props.buttonText}</button>
		</form>
	);
}

export default App;
