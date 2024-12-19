<?php

namespace App\Controller;

use App\Entity\Image;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class ImageController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/images', methods: ['POST'])]
    public function upload(Request $request): JsonResponse
    {
        $user = $this->getUser();
        dump($user);
        die();

        $path = $request->files->get('path');
        if (!$path) {
            return new JsonResponse(['error' => 'path is required'], 400);
        }

        $filename = $request->request->get('filename') ?: uniqid();
        $uploadsDir = $this->getParameter('uploads_directory');
        $filePath = $uploadsDir . '/' . $filename;

       
        try {
           
            copy($path, $filePath);  
        } catch (FileException $e) {
            return new JsonResponse(['error' => 'Could not upload file'], 500);
        }

       
        $image = new Image();
        $image->setFilename($filename);
        $image->setPath($filePath);
        $image->setCreatedAt(new \DateTimeImmutable());
        $image->setUser($user); 

     
        $this->entityManager->persist($image);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Image bien publiée', 'id' => $image->getId()], 201);
    }


    #[Route('/api/images', methods: ['GET'])]
    public function getAllImages(): JsonResponse
    {
        $images = $this->entityManager->getRepository(Image::class)->findAll();
        $data = [];

        foreach ($images as $image) {
            $data[] = [
                'id' => $image->getId(),
                'filename' => $image->getFilename(),
                'path' => $image->getPath(),
                'userId' => $image->getUser()->getId(),
            ];
        }

        return new JsonResponse($data);
    }

    #[Route('/api/images/user/{id}', methods: ['GET'])]
    public function getImagesByUser(int $id): JsonResponse
    {
        $images = $this->entityManager->getRepository(Image::class)->findBy(['user' => $id]);
        $data = [];

        foreach ($images as $image) {
            $data[] = [
                'id' => $image->getId(),
                'filename' => $image->getFilename(),
                'path' => $image->getPath(),
            ];
        }

        return new JsonResponse($data);
    }

    #[Route('/api/images/{id}', methods: ['DELETE'])]
    #[IsGranted('ROLE_USER')]
    public function deleteImage(int $id): JsonResponse
    {
        $image = $this->entityManager->getRepository(Image::class)->find($id);

        if (!$image) {
            return new JsonResponse(['error' => 'Image not found'], 404);
        }

       
        if ($image->getUser() !== $this->getUser()) {
            return new JsonResponse(['error' => 'You are not allowed to delete this image'], 403);
        }

      
        $filePath = $image->getPath();
        if (file_exists($filePath)) {
            unlink($filePath);
        }

       
        $this->entityManager->remove($image);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Image deleted successfully']);
    }
}
