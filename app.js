
// (work-1) modal -1 (region)

document.querySelector('.home-link').addEventListener('click',(e)=>{
    e.preventDefault();
    
    const modal = document.querySelector('.modal-1');
    const body = document.querySelector('body');
    modal.style.display = 'block';


    const regionSelect = document.getElementById('region');
    const currencySelect = document.getElementById('currency');
    currencySelect.disabled = true;

    
    // Function to update currency based on selected region
    function updateCurrency() {
      const selectedRegion = regionSelect.value;
       
      // Update currency based on selected region
      switch (selectedRegion) {
        case 'US':
          currencySelect.value = 'USD'; 
          
           // United States -> USD
          break;
        case 'ES':
            currencySelect.value = 'EURO';  // Spain, Germany -> EURO
            
            break;
        case 'DE':
          currencySelect.value = 'EURO';  // Spain, Germany -> EURO
        
          break;
        case 'UK':
          currencySelect.value = 'GBP';  // United Kingdom -> GBP
       
          break;
        default:
          currencySelect.value = 'USD';  // Reset currency if no region selected
      }
    }
    
    // Add event listener to region select element
    regionSelect.addEventListener('change', updateCurrency);
    
    // Call the function on page load to set the initial currency based on the default region
    updateCurrency();

    // saveButton

    document.querySelector('.save-button').addEventListener('click',()=>{
        const regionText = document.querySelector('.region-text');
        
        const successMessage = document.getElementById('success-message');
  successMessage.style.display = 'block';

  // Optionally hide it after a few seconds
  setTimeout(() => {
    const regionSelect = document.getElementById('region');

  const selectedOption = regionSelect.options[regionSelect.selectedIndex];

  // Get the visible text of the selected option
  const selectedRegionName = selectedOption.textContent;
    successMessage.style.display = 'none';
    modal.style.display = 'none';
    console.log(selectedRegionName);
    regionText.innerText = "";
    regionText.innerText = selectedRegionName;
  }, 2000); // Hides the message after 3 seconds
    });
   
    
   

     
    document.querySelector('.close-button-1').addEventListener('click', () => {
        modal.style.display = 'none'; 
        console.log('close'); 
      });
      // Get the region and currency select elements
      

})

// (work-2) icon button (save) 

document.querySelector('.icon-btn-save').addEventListener('click',()=>{
    const fillLove = document.querySelector('.fill-love');
    const emptyLove = document.querySelector('.empty-love');

    if (fillLove.style.display === 'block') {
        emptyLove.style.display = 'block';
        fillLove.style.display = 'none';
       
      } else {
        emptyLove.style.display = 'none';
        fillLove.style.display = 'block';
      }
})

// (work-3) modal - 2

document.querySelector('.travelers-btn').addEventListener('click',(e)=>{
    e.preventDefault();
    
    const modal = document.querySelector('.modal-2');
    modal.style.display = 'block';
    document.querySelectorAll('.form-input-group button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const input = e.target.parentNode.querySelector('input');
          let value = parseInt(input.value);
          if (e.target.textContent === '-') {
            value = Math.max(value - 1, 0);
          } else {
            value++;
          }
          input.value = value;
        });
      });
    
      // Add event listener for the checkbox
      document.querySelector('.form-checkbox input').addEventListener('change', (e) => {
        e.target.parentNode.classList.toggle('checked', e.target.checked);
      });
    
      // Add event listener for the Done button
      document.querySelector('.done-button-2').addEventListener('click', () => {
        const adults = document.querySelectorAll('.form-input-group')[0].querySelector('input').value;
        const children = document.querySelectorAll('.form-input-group')[1].querySelector('input').value;
        const pets = document.querySelector('.form-checkbox input').checked;
        // alert(`Adults: ${adults}\nChildren: ${children}\nPets: ${pets}`);
      });
    
      // Add event listener for the close button
      document.querySelector('.close-button-2').addEventListener('click', () => {
        // Add close functionality here
        // alert('Modal would close');
        modal.style.display = 'none'; 
        console.log('close'); 
      });
      // done button - 2
      
      document.querySelector('.done-button-2').addEventListener('click',()=>{
          const adultCount = document.querySelector('.adult-count');
          const childCount = document.querySelector('.child-count');
          const adultCountNumber = parseInt(adultCount.value);
          const childCountNumber = parseInt(childCount.value);
          let newlyAdded = adultCountNumber+childCountNumber;
          // console.log(adultCountNumber+childCountNumber);
          
          const totalCount = document.querySelector('.count-traveler');
          // let totalCountNumber = parseInt(totalCount.textContent);
          // totalCountNumber+=newlyAdded;
          totalCount.textContent = newlyAdded;
      
          modal.style.display = 'none'; 
          // console.log(typeof(newlyAdded));
          // console.log(totalCountNumber)
      
      })
});

// work(4) icon button (share)

document.querySelector('.icon-btn-share').addEventListener('click',()=>{
    const modal = document.querySelector('.modal-3');
    modal.style.display = 'block';

    document.querySelector('.copy-link').addEventListener('click', () => {
        // Add copy to clipboard functionality here
        const vacationUrl = "https://example.com/juneau-vacation-home";
        const tempInput = document.createElement('textarea');
      tempInput.value = vacationUrl;
      document.body.appendChild(tempInput);

      // Select and copy the text
      tempInput.select();
      document.execCommand('copy');

      // Remove the temporary input element
      document.body.removeChild(tempInput);

        alert('Link copied to clipboard');
      });
  
      // Add click event listener for the close button
      document.querySelector('.close-button').addEventListener('click', () => {
        // Add close functionality here
        alert('Modal would close');
        modal.style.display = 'none';
      });

})

