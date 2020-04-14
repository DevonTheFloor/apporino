Feature: boutique_specialisee

  En tant que client , je souhaite pouvoir selectionner un produit dans la liste voulue, et passer commande.
  
  Scenario: Je vais dans la boutique d'ours en peluche pour en acheter un.
  
    Given je clique sur la boutique ours en peluche
    
    Then la page affiche les données du serveur
    
  
  Scenario: Sur la page des ours en peluche
  
    Given je choisi un produit, une page souvre
    
    When je l'ai personnalise , je l'ajoute à mon panier
    
    Then je rempli correctement le formulaire pour passer commande 
    
    And un message de confirmation me recapitule mon achat

  