const iconList= document.querySelector('.iconList');
const listheaderForlg=document.querySelector('.listheaderForlg');
const hlink= document.querySelectorAll('.hlink');
const fa_solid= document.querySelector('.fa-solid');
const main= document.querySelector('.main');
const fa_xmark = document.querySelector('.fa-xmark');

function hidden(){
    listheaderForlg.classList.toggle('show');
    main.classList.toggle('blur-effect');
}

iconList.addEventListener('click',()=> hidden());
hlink.forEach(link =>{
    link.addEventListener('click',()=> hidden())
});
fa_xmark.addEventListener('click',()=>hidden())

const left = document.querySelector('.fa-angle-left');
const content= document.querySelector('.content-img');
const card= document.querySelectorAll('.user-card');

left.addEventListener('click', () => {
    content.prepend(content.lastElementChild);
});

const right= document.querySelector('.fa-angle-right');

right.addEventListener('click', () => {
    content.appendChild(content.firstElementChild);
});

// touch
let isDown = false;
let start = 0;

content.addEventListener('pointerdown', e=>{
    isDown = true;
    start = e.pageX;
    content.setPointerCapture(e.pointerId); 
});

content.addEventListener('pointermove', e =>{
    if(!isDown) return;
    const walk = (e.pageX - start ) * 0.3;
    content.scrollLeft = content.scrollLeft - walk;

    if(content.scrollLeft + content.clientWidth >= content.scrollWidth -5 ){
        const firstcard = content.firstElementChild
        content.appendChild(firstcard);
        content.scrollLeft -= firstcard.offsetWidth + 30 ;
    }
    if(content.scrollLeft <= 5 ){
        const lastCard = content.lastElementChild;
        content.prepend(lastCard);
        content.scrollLeft += lastCard.offsetWidth + 30 ;
    }
})

const stopscroll = () => {
    isDown = false;
}
content.addEventListener('pointerup', stopscroll);
content.addEventListener('pointercancel', stopscroll);

const points = document.querySelectorAll('.points div');

points.forEach((point, index) => {
    point.addEventListener('click',()=>{
        points.forEach(p => p.classList.remove('active'))
        point.classList.add('active');
        card[index % 5].scrollIntoView({
            inline: 'center',
            block: 'nearest'
        }) 
        if(content.scrollLeft + content.clientWidth >= content.scrollWidth -5 ){
            const firstcard = content.firstElementChild
            content.appendChild(firstcard);
            content.scrollLeft -= firstcard.offsetWidth + 30 ;
        }
        if(content.scrollLeft <= 5 ){
            const lastCard = content.lastElementChild;
            content.prepend(lastCard);
            content.scrollLeft += lastCard.offsetWidth + 30 ;
        } 
    })
})