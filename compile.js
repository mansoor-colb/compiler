const axios = require('axios');
async function call(){
const options = {
  method: 'GET',
  url: 'https://online-code-compiler.p.rapidapi.com/v1/languages/',
  headers: {
    'X-RapidAPI-Key': 'b38251f12dmsh1e354647d127793p1fe19ejsnd617ffc74cff',
    'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
}
// call()



async function cool(lang,code){

const options = {
  method: 'POST',
  url: 'https://online-code-compiler.p.rapidapi.com/v1/',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'b38251f12dmsh1e354647d127793p1fe19ejsnd617ffc74cff',
    'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
  },
  data: {
    language: lang,
    version: 'latest',
    code: code,
    input:'7 3'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
}
cool("java",`
import java.util.Scanner;
public class LinearSearch {
	// This function returns index of element x in arr[]
	static int search(int arr[], int n, int x)
	{
		for (int i = 0; i < n; i++) {
			// Return the index of the element if the element
			// is found
			if (arr[i] == x)
				return i;
		}

		// return -1 if the element is not found
		return -1;
	}

	public static void main(String[] args)
	{
		int[] arr = { 3, 4, 1, 7, 5 };
		int n = arr.length;
		Scanner sc=new Scanner(System.in);
		int p = sc.nextInt();
		int x = sc.nextInt();

		int index = search(arr, n, x);
		if (index == -1)
			System.out.println("Element is not present in the array");
		else
			System.out.println("Element found at position " + index);
	}
}
`);