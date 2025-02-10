const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a'); // Seleciona todos os links do menu

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fechar o menu ao clicar em um item do menu
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active'); // Fecha o menu
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-button');
    const produtoItems = document.querySelectorAll('.produto-item');
    let selectedFilters = new Set(); // Armazena as categorias selecionadas

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Se o filtro for "all", limpa todas as seleções e mostra todos os itens
            if (filter === 'all') {
                selectedFilters.clear();
                this.classList.add('active');
                filterButtons.forEach(btn => {
                    if (btn !== this) btn.classList.remove('active');
                });
            } else {
                // Adiciona ou remove o filtro da lista de selecionados
                if (selectedFilters.has(filter)) {
                    selectedFilters.delete(filter);
                    this.classList.remove('active');
                } else {
                    selectedFilters.add(filter);
                    this.classList.add('active');
                }

                // Remove o destaque do botão "Todos" se outros filtros estiverem ativos
                const allButton = document.querySelector('.filter-button[data-filter="all"]');
                if (selectedFilters.size > 0) {
                    allButton.classList.remove('active');
                } else {
                    allButton.classList.add('active');
                }
            }

            // Filtra os itens
            produtoItems.forEach(item => {
                const category = item.getAttribute('data-category');

                // Se nenhum filtro estiver selecionado ou se o item pertencer a uma das categorias selecionadas
                if (selectedFilters.size === 0 || selectedFilters.has(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Deixa o item do menu ativo em qual section estiver
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section'); // Todas as seções
    const navLinks = document.querySelectorAll('.nav-links a'); // Todos os links do menu

    function highlightMenu() {
        let currentSection = '';

        // Verifica qual seção está visível
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        // Adiciona a classe 'active' ao link correspondente
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }

    // Observa o scroll da página
    window.addEventListener('scroll', highlightMenu);

    // Executa a função ao carregar a página
    highlightMenu();
});